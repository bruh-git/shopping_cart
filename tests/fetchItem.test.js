require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
   });
   it('Execute a função fetchItem com o argumento "MLB1615760527"', () => {
     fetchItem('MLB1615760527');
     expect(fetch).toHaveBeenCalled();
   });
   it('se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
     fetchItem('MLB1615760527');
     const endpoint = ('https://api.mercadolibre.com/items/MLB1615760527')
     expect(fetch).toHaveBeenCalledWith(endpoint);
   });
   it('se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
     expect.assertions(1);
     expect(await fetchItem('MLB1615760527')).toEqual(item);
   });
   it('se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
   });
});
