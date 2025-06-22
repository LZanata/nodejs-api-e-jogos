const viacepService = require('../services/viacepService');

/**
 * Handles HTTP request to retrieve address information by CEP (postal code).
 *
 * @async
 * @function getAddressByCep
 * @param {import('express').Request} req - Express request object, expects `cep` parameter in `req.params`.
 * @param {import('express').Response} res - Express response object used to send the response.
 * @returns {Promise<void>} Sends a JSON response with the address data, 404 if not found, or 500 on error.
 */
async function getAddressByCep(req, res) {
    const { cep } = req.params;
    try {
        const address = await viacepService.fetchAddressByCep(cep);
        if (address) {
            res.json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving address', error: error.message });
    }
}

module.exports = { getAddressByCep };