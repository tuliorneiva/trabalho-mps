import { NestLoggerAdapter } from './log.adapter';

describe('NestLoggerAdapter (Adapter Pattern)', () => {
  let adapter: NestLoggerAdapter;

  beforeEach(() => {
    adapter = new NestLoggerAdapter('TestContext');
  });

  it('deve instanciar sem erros', () => {
    expect(adapter).toBeDefined();
  });

  it('deve expor os métodos log, error e warn', () => {
    expect(typeof adapter.log).toBe('function');
    expect(typeof adapter.error).toBe('function');
    expect(typeof adapter.warn).toBe('function');
  });

  it('deve chamar log sem lançar exceção', () => {
    expect(() => adapter.log('mensagem de teste')).not.toThrow();
  });

  it('deve chamar error sem lançar exceção', () => {
    expect(() => adapter.error('erro de teste', 'stack trace')).not.toThrow();
  });

  it('deve chamar warn sem lançar exceção', () => {
    expect(() => adapter.warn('aviso de teste')).not.toThrow();
  });
});
