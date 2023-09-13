import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://51.79.188.203:9076";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getAll: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  }
};

export default dataProvider;
