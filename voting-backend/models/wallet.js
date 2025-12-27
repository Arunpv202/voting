module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        wallet_address: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        election_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'voter', 'authority'),
            allowNull: false,
            primaryKey: true
        },
        authority_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pk: {
            type: DataTypes.STRING,
            allowNull: true
        },
        share: {
            type: DataTypes.STRING,
            allowNull: true
        },
        commitment: {
            type: DataTypes.TEXT, // Store JSON array of commitments
            allowNull: true
        }
    }, {
        timestamps: true,
        underscored: true
    });
    return Wallet;
};
