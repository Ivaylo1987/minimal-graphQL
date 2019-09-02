const data = {
  article: {
    "1": { id: "1", title: 'One little piggy', slug: 'One.' },
    "2": { id: "2", title: 'Two little piggies', slug: 'Two..' },
    "3": { id: "3", title: 'Three little piggies', slug: 'Three...' }
  }
}

export { data };

export default (type, id) => {
  return data[type][id];
};
