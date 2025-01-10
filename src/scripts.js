
// all possible State Path Routes
let rawStatePathRoutes = [
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-0/waive-your-copyright+waive+read/(attribution-details)&license=cc-0',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by/(attribution-details)&license=cc-by',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-sa/(attribution-details)&license=cc-by-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nd/(attribution-details)&license=cc-by-nd',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc/(attribution-details)&license=cc-by-nc',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-sa/(attribution-details)&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/yes/which-license-do-you-need/cc-by-nc-nd/(attribution-details)&license=cc-by-nc-nd',
    
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/yes/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nd',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/yes/share-alike/yes/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc-sa',
    'do-you-know-which-license-you-need/no/require-attribution/yes/allow-commercial-use/no/allow-derivatives/no/confirmation+ownership+read+revocation/(attribution-details)&license=cc-by-nc-nd',
    'do-you-know-which-license-you-need/no/require-attribution/no/waive-your-copyright+waive+read/(attribution-details)&license=cc-0'
];

// function to parse and build state.possibilities
// from rawStatePathRoutes

// function to track state.parts

// function to update and track state.current
// this is a full combo of all set state.parts

// function to compare state.possibilities to state.current, 
// determine if valid license, or error

// function to set state.props
// including setting state.props.license (if valid)

// stepper logic here for what parts of form are 
// displayed/hidden, as state.parts and state.current 
// are updated

// function to render "license recommendation",
// if valid license from state.parts and/or state.current

// function to render "mark your work", from attribution fields
// if valid license from state.parts and/or state.current

// function to handle error state
