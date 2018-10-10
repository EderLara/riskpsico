db.people.aggregate({
    $project: {
        _id: 0,
        dimension: 1,
        latitudeSum: {
            $add: [
                "$latitude",
                1000,
                10000
            ]
        },
        latitudeSubtract: {
            $subtract: [
                "$latitude",
                10
            ]
        },
        latitudeDivide: {
            $divide: [
                "$latitude",
                "$longitude"
            ]
        },
        latitudeMultiply: {
            $multiply: [
                "$latitude",
                "$longitude"
            ]
        },
        ageMod: {
            $mod: [
                "$age",
                2
            ]
        }
    }
});


db.respuestas.aggregate(
    [   
        {
            $group: {
              _id: "$usuario",
              dimension: "$dimension",
              "Suma": {$sum: "$responde" }
              }
        },
        {
          $lookup: {
            from: "dimensiones",
            as: "FactorA",
            localField: "$_id",
            foreignField: "d$imension"
          }
        },
        { $unwind: "$resultingArray"}
        {
            $project: {
              usuario: "$_id",
              dimension: "$dimension",
              puntaTransfom: {
                        $divide: [
                            {        
                                $multiply: [
                                    "$Suma",
                                    100
                                    ]
                            },
                            "$FactorA"
                        ]
                    },
              }
        }
    ]
);
