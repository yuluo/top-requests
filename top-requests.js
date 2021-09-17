/**
 * Q&A
 * Q: What would you do differently if you had more time?
 * A: write unit test and setup stress test. Make sure it meets both functional and performance requirements
 * 
 * Q: What is the runtime complexity of each function?
 * A: requestHandles is O(1). top100 is also O(1)
 * 
 * Q: How does your code work?
 * A: create a map for counting request and build a index for top 100 requests
 * 
 * Q: What other approaches did you decide not to pursue?
 * A: select 100 requests from requestCount every top100 is called. It takes too long comparing to pre-build the top 100 index.
 * 
 * Q: How would you test this?
 * A: Unit test for functional requirements, and stress test for performace requirements.
 */

class Request {
    constructor(ipAddress, count) {
        this.ipAddress = ipAddress;
        this.count = count;
    }
}

let requestCount = {}; // {ip: count}, sources of truth for request count
let top100Ips = []; // string[], top 100 ip addresses by request count

/**
 * request handler
 * @param {string} ipAddress 
 */
function requestHandled(ipAddress) {
    if(requestCount[ipAddress]) {
        requestCount[ipAddress]++;
    } else {
        requestCount[ipAddress] = 1;
    }

    top100Ips = updateTop100(ipAddress);
}
/**
 * update top100 index
 * 
 * @param {string} ipAddress
 * @returns string[] 
 */
function updateTop100(ipAddress) {
    const higherCount = top100Ips.filter(ip => requestCount[ip] > requestCount[ipAddress]);
    const lowerCount = top100Ips.filter(ip => requestCount[ip] <= requestCount[ipAddress] && ip !== ipAddress);
    
    higherCount.push(ipAddress);

    return higherCount.concat(lowerCount).slice(0, 100);
}

/**
 * return 100 ips by request count
 * @returns Request[]
 */
function top100() {
    return top100Ips.map(ip => new Request(ip, requestCount[ip]));
}

/**
 * Reset request count
 */
function clear() {
    requestCount = {};
    top100Ips = [];
}