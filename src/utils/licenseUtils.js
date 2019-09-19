// eslint brace-style: 0

function shortToFull(shortLicenseName) {
    var base = 'Attribution'
    var short = shortLicenseName.toLowerCase()
    if (short.includes('nc')) { base += '-NonCommercial' }
    if (short.includes('sa')) { base += '-ShareAlike' }
    else if (short.includes('nd')) { base += '-NoDerivatives' }
    // eslint-disable-next-line
    return base += ' 4.0'
}

function fullToShort(fullLicenseName) {
    var base = 'CC BY'
    var full = fullLicenseName
    if (full.includes('noncommercial')) { base += '-NC' }
    if (full.includes('sharealike')) { base += '-SA' }
    else if (full.includes('noderivatives')) { base += '-ND' }
    // eslint-disable-next-line
    return base += ' 4.0'
}

export default { shortToFull, fullToShort }
