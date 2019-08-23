function licenseUrl(licenseName) {
    licenseName = licenseName.toLowerCase().slice(3, licenseName.length - 4)
    return 'https://creativecommons.org/licenses/' + licenseName + '/4.0'
}

function isFullName(licenseName) {
    licenseName.toLowerCase()
    if (licenseName.includes("attribution") || licenseName.includes("noderivatives") ||
        licenseName.includes("sharealike") || licenseName.includes("noncommercial")) {
            console.error("Is Full Name")
        return true
    }
    return false
}

export default licenseUrl
