import * as AprioriService from "../services/apriori";

export const train = async (req, res) => {
  let candidateSet = await AprioriService.computeCandidateSet(1, [], []);
  await AprioriService.truncateFrequentSet();
  await AprioriService.saveFrequentSet(candidateSet);
  res.json({ candidateSet: candidateSet });
};

export const getFrequentSet = async (req, res) => {
  let frequentSet = await AprioriService.getFrequentSet();
  res.json(frequentSet);
};

export const getConfidences = async (req, res) => {
  let frequentSet = await AprioriService.getFrequentSet();
  let dtos = frequentSet.map((x) => {
    return {
      key: x.itemset,
      value: x.sup_count,
    };
  });
  let confidences = AprioriService.computeConfidence(dtos);

  res.json(confidences);
};
