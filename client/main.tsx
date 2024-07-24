import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { linksInsert } from '/imports/api/links';

// minimongo
// import { LinksCollection } from '/imports/api/links';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(<App />);

  // minimongo
  // LinksCollection.insertAsync({ title: 'blood', url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html', createdAt: new Date() });

  // meteor methods
  Meteor.call('linksInsert', { title: 'blood', url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html' });

  // methods ts
  // linksInsert('blood');
});
