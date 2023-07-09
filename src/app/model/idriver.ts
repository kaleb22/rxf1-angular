export interface IDriver {
  driverId: string,
  code: string,
  givenName: string;
  familyName:  string;
  constructorId: string;
  staticPath: IPath;
};

export interface IPath {
  color: string;
  imgPath: string;
}
