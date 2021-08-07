module.exports = (sequelize, DataTypes) => {

    const Inventory = sequelize.define("Inventory", {
        inventoryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        margin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
      
    });

    return Inventory;
}