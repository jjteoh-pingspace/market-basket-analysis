import Transaction from "../database/models/transaction";
import AprioriFrequentSet from "../database/models/aprioriFrequentSet";
import { ref } from "objection";

const MIN_SUP_COUNT = 500; // 20 * 3000 / 100
const MIN_CONFIDENCE = 20; // percent

/**
 *
 * @param {number} K - nth iteration
 * @param {array} prevC - previous candidateset
 */
export const computeCandidateSet = async (K, prevC, allCandidates) => {
  let currentC = [];

  if (K == 1) {
    // generate first tier candidate set
    let i = 0;
    while (i < 30) {
      let countOfItem = (
        await Transaction.query()
          .whereRaw(`basket -> 'items' @> '[${i}]'`)
          .count("id")
      )[0].count;
      console.log(countOfItem);
      console.log(`${i} : ${countOfItem}`);
      if (countOfItem >= MIN_SUP_COUNT) {
        currentC.push({
          key: i.toString(),
          value: countOfItem,
        });
      }
      i++;
    }
  } else {
    let candidates = [];
    for (let i = 0; i < prevC.length - 1; i++) {
      // This is where you'll capture that last value
      for (let j = i + 1; j < prevC.length; j++) {
        let combined = [];
        let a = prevC[i].key.replace("[", "").replace("]", "").split(",");
        let b = prevC[j].key.replace("[", "").replace("]", "").split(",");
        combined.push(...a);
        combined.push(...b);

        let set = [...new Set(combined)];
        set = set.sort();
        if (set.length == K) candidates.push(`[${set.join(",")}]`);
      }
    }

    for (let i = 0; i < candidates.length; i++) {
      let countOfItem = (
        await Transaction.query()
          .whereRaw(`basket -> 'items' @> '${candidates[i]}'`)
          .count("id")
      )[0].count;
      if (
        countOfItem >= MIN_SUP_COUNT &&
        !currentC.find((x) => x.key == candidates[i])
      ) {
        currentC.push({
          key: candidates[i],
          value: countOfItem,
        });
      }
    }
  }

  console.log("current K", K);
  console.log("current C", currentC);

  allCandidates.push(...currentC);

  if (currentC.length > 0 && K < 30)
    return computeCandidateSet(K + 1, currentC, allCandidates);
  return allCandidates;
};

export const truncateFrequentSet = async () => {
  await AprioriFrequentSet.query().truncate();
};
export const saveFrequentSet = async (frequentSet) => {
  await AprioriFrequentSet.query().insert(
    frequentSet.map((x) => {
      return {
        itemset: x.key,
        sup_count: x.value,
      };
    })
  );
};

export const getFrequentSet = async () => {
  return await AprioriFrequentSet.query()
    .whereNotDeleted()
    .select("itemset", "sup_count");
};

export const computeConfidence = (candidateSet) => {
  let confidences = [];
  for (let i = 0; i < candidateSet.length; i++) {
    let keys = candidateSet[i].key.replace("[", "").replace("]", "").split(",");
    if (keys.length == 1) continue;

    for (let j = 0; j < keys.length; j++) {
      let supAB = candidateSet[i].value;
      let keyA = keys.filter((x) => x != keys[j]).join(",");
      keyA = keys.length > 2 ? "[" + keyA + "]" : keyA;
      let supA = candidateSet.find((x) => x.key == keyA).value;

      let confidence = ((supAB / supA) * 100).toFixed(4);
      confidences.push({
        A: keyA,
        B: keys[j],
        confidences: confidence,
        text: `Confidence(${keyA} => ${keys[j]}): ${confidence}%`,
      });
    }
  }
  return confidences;
};
