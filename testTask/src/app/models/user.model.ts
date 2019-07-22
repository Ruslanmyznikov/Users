export class User {
  about: string;
  address: string;
  age: number;
  balance: string;
  company: string;
  email: string;
  eyeColor: string;
  gender: string;
  guid: string;
  isActive: boolean;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  picture: string;
  registered: any;
  tags: string[];
  _id: string;
  constructor (
    about = '',
    address = '',
    age = null,
    balance = '',
    company = '',
    email = '',
    eyeColor = '',
    gender = '',
    guid = '',
    isActive = false,
    latitude = null,
    longitude = null,
    name = '',
    phone = '',
    picture = '',
    registered = '',
    tags = [],
    _id = ''
  ) {
    this.about = about;
    this.address = address;
    this.age = age;
    this.balance = balance;
    this.company = company;
    this.email = email;
    this.eyeColor = eyeColor;
    this.gender = gender;
    this.guid = guid;
    this.isActive = isActive;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.phone = phone;
    this.picture = picture;
    this.registered = registered;
    this.tags = [];
  }
}
