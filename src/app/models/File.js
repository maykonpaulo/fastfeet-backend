import Sequelize from 'sequelize';

class File extends Sequelize.Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }
}

export default File;
