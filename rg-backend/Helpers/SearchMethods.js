module.exports = {
  filterResults: (indicies) => {
    var indiciesProps = Object.values(indicies.body).map(x => x.mappings.msg.properties)

    var fieldsStack = []

    indiciesProps.forEach(index => {
      Object.entries(index).forEach(x => fieldsStack.push(x))
    });

    var filteredFields = fieldsStack.reduce((accumulator, field, index, array) => {
      const { list, hashList } = accumulator
      const hash = JSON.stringify(field).replace(/\s/g, '')
    
      if (hash && !hashList.includes(hash)) {
        hashList.push(hash)
        list.push(field)
      }
    
      if (index + 1 !== array.length) {
        return accumulator
      }  else {
        return accumulator.list
      }
    }, { list: [], hashList: [] })

    const fields = filteredFields.map(x => { 
      if (x[1].type && x[1].type != 'object') {
        return {
          name: x[0],
          type: x[1].type
        }
      }})
    return fields
  }
} 
