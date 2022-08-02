import { ParsedQs } from 'qs';

interface ValidateParams extends ParsedQs {
  q:
    | string
    | 'top_features_used'
    | 'top_topics_of_interest'
    | 'health_conditions'
    | 'gender';
}
export default ValidateParams;
