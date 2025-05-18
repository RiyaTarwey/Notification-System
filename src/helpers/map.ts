const mapSingleData = async (
    forMapCollection: any,
    forWhereColumn: any,
    forWhereValue: any,
    forMapModel: any,
    mapVal: any,
    mapColumnName: any
) => {
    let mappedData = await Promise.all(
        forMapCollection.map(async (child: any) => {
            let whereData = {
                [forWhereColumn]: child?.[forWhereValue],
            };
            let mapValObject = await forMapModel.findOne({ where: whereData });
            let mapCollection = child.toJSON ? child.toJSON() : child;
            return {
                ...mapCollection,
                [mapColumnName]: mapValObject ? mapValObject?.[mapVal] : null,
            };
        })
    );
    return mappedData;
};