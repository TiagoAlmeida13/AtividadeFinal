/** Adds to the global object a "lp" namespace with:
 * - function getSeries(query: str, len: number, distinct: string[])
 */
(function () {
  
  ENDPOINT = 'http://ec2-3-93-183-225.compute-1.amazonaws.com:443/series';

  function makeUrl(urlStr, paramsObj) {
    const url = new URL(urlStr);
    Object.keys(paramsObj).forEach(key => url.searchParams.append(key, paramsObj[key]));
    return url;
  }

  async function getSeries(query, len, distinct) {
    const url = makeUrl(ENDPOINT, { query: query || '', len, distinct });
    const apiResponse = await fetch(url);
    if (apiResponse.status !== 200) {
      throw 'API did not return 200 status code';
    }
    const responseBody = await apiResponse.json();
    if (responseBody.error) {
      throw responseBody.error;
    } else {
      return responseBody;
    }
  }

  this.lp = { getSeries };

})();