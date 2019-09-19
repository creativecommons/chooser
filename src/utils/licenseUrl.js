function licenseUrl(licenseName) {
    licenseName = licenseName.toLowerCase().slice(3, licenseName.length - 4)
    return 'https://creativecommons.org/licenses/' + licenseName + '/4.0/?ref=ccchooser'
}

// eslint-disable-next-line
function isFullName(licenseName) {
    licenseName.toLowerCase()
    if (licenseName.includes('attribution') || licenseName.includes('noderivatives') ||
        licenseName.includes('sharealike') || licenseName.includes('noncommercial')) {
        return true
    }
    return false
}

export default licenseUrl
