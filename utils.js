
function SplitEntity(entity) {
    const splitInfo = entity["SplitInfo"];
    const ID = entity.ID
    const [flatType, percentType, ratioType] = [[], [], []];

    // Calculate total ratio
    let totalRatio = 0;
    // Loop through splitInfo, put in right category
    for (let idx = 0; idx < splitInfo.length; idx++) {
        const idxValue = splitInfo[idx];
        const category = idxValue['SplitType'];
        switch (category) {
            case "FLAT":
                flatType.push({idxValue});
                break;
            case "PERCENTAGE":
                percentType.push({ idxValue});
                break;
            case "RATIO":
                // Calculate totalRatio for later calculations in ratio 
                totalRatio += idxValue["SplitValue"];
                ratioType.push({ idxValue});
                break; 
        }
    }
    const splitResult = [];
    let balance = entity["Amount"];

    // Start with flatType
    for (let objectToSplit of flatType) {
        const split = objectToSplit["idxValue"];
        // Reduce balance by splitvalue
        const flatValue = split["SplitValue"]
        balance -= flatValue

        if(flatValue < 0){
            return {err: "Amount cannot be negative"}
        }
        // Add split to splitResult
        splitResult.push({
            SplitEntityId: split.SplitEntityId,
            Amount: split["SplitValue"]
        });

    }

    // Move to PERCENTAGE
    for (let objectToSplit of percentType) {
        const split = objectToSplit["idxValue"];

        // Get percent Value
        const percentValue = (split["SplitValue"] / 100) * balance

        if(percentValue < 0){
            return {err: "Amount cannot be negative"}
        }
        // Reduce balance by percentValue
        balance -= percentValue

        // Add split to split Result
        splitResult.push({
            SplitEntityId: split.SplitEntityId,
            Amount: percentValue
        });
    }

    // Move to RATIO
    const amtLeft = balance // Balance doesn't change while computing the ratio ant
    for (let objectToSplit of ratioType) {
        const split = objectToSplit["idxValue"];

        // Get ratio value
    
        const ratioValue = totalRatio > 0 ?
                        (split["SplitValue"] / totalRatio) * amtLeft : 0
        if(ratioValue < 0){
            return {error : "Amount cannot be negative"}
        }
        balance -= ratioValue
        
        splitResult.push({
            SplitEntityId: split.SplitEntityId,
            Amount: ratioValue 
        });

    }
    // Handling Edge Cases
    if(balance <  0){
        
        return {
            err: "Balance cannot be negative"
        }
    }
    if(splitResult.length < 1 || splitResult.length > 20){
        return {
            error: "array can contain a minimum of 1 split entity and a maximum of 20 entities"
        }
    }
    return {ID: ID, Balance: balance, SplitBreakdown: splitResult};
}


module.exports = SplitEntity
