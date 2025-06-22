const axios = require('axios');

async function fetchAddressByCep(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) return null;
    return response.data;
}

module.exports = { fetchAddressByCep };