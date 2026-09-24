export function extractQueryParams(query) {
    return query
        .substr(1)
        .split('&')
        .map(param => param.split('='))
        .reduce((queryParams, [key, value]) => {
            queryParams[key] = value
            return queryParams
        }, {})
}