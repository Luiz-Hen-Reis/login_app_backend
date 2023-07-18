import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import bcrypt from "bcrypt";

type CheckPasswordCallBackFn = (
  err?: Error | undefined,
  isSame?: boolean
) => void;

export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
}

export interface UserCreationAttributes extends Optional<UserI, "id"> {}

export interface UserInstance
  extends Model<UserI, UserCreationAttributes>,
    UserI {
  checkPassword: (
    password: string,
    callbackFn: CheckPasswordCallBackFn
  ) => void;
}

export const User = sequelize.define<UserInstance, UserI>(
  "users",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (
  password: string,
  callbackFn: CheckPasswordCallBackFn
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) callbackFn(err, false);
    else callbackFn(err, isSame);
  });
};
