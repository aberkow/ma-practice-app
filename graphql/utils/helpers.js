module.exports = {
  /**
   * @param {array} - an array of id's
   * @param {Object} - the Mongoose model
   * 
   * Returns the results of an array of Promises.
   * Finds documents by the ID and then populates by the model name
   * 
   */
  guarantee: async (arr, model) => {
    const modelName = model.toString();
    const results = await Promise.all(arr.map(async x => {
      return await model.findById(x).populate(modelName);
    }))
    return results;
  }
}