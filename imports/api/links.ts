import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


/// lib

// type Method = <A extends any[]>(...args: A) => Promise<any>;

// const createMethod = (name: string, f: Method): Method => {
//   if (Meteor.isServer) {
//     Meteor.methods({ [name]: f });
//     return f;
//   } else {
//     return (...args) => Meteor.callAsync(name, ...args);
//   }
// };


/// app

export interface Link {
  _id?: string;
  title: string;
  url: string;
  createdAt: Date;
}

export const LinksCollection = new Mongo.Collection<Link>('links');

// export const linksInsert = createMethod('linksInsert', (title: string) => {
//   console.log('linksInsert', title);
//   return LinksCollection.insertAsync({ title, url: '', createdAt: new Date() })
// });


function toto(toto: Assert<string>) {
  console.log('toto', toto);
}

console.log('good');
toto('ok');
console.log('not good');
toto(12);
