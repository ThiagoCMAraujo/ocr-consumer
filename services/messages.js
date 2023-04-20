const getMessages = () => ({
  ptbr: {
    error: 'Ocorreu um erro, entre em contato com o suporte',
    'bad.request':
      'O payload da sua requisição não está correto verifique na nossa documentação https://docs.bot.teasy.solutions',
    'not.authorized': 'Sua requisição não foi autorizada',
    'created.company.sucess': 'A sua empresa foi criada com sucesso',
    'created.company.failure':
      'Ocorreu um problema na criação da sua empresa, entre em contato com o suporte',
    'send.text.success':
      'A mensagem está sendo enviada para o número informado',
    'send.image.success': 'A imagem está sendo enviada para o número informado',
    'schedule.success': 'O seu agendamento foi salvo com sucesso',
    'schedule.delete.success':
      'O agendamento neste horário e com esse messageId foi apagado.',
    'send.text.failure':
      'A mensagem não pode ser enviada para o número informado, analise seus dados ou entre em contato com o nosso suporte',
    'send.image.failure':
      'A imagem  não pode ser enviada para o número informado, analise seus dados ou entre em contato com o nosso suporte',
    'schedule.failure': 'O seu agendamento não pode ser salvo',
    'talk.list': 'A seguir seguem os dados relacionados a conversa solicitada',
    'talk.list.not.found': 'Tivemos um problema para encontrar a sua conversa',
  },
});

const getCodes = () => ({
  success: 'T01',
  'send.text.failure': 'T02',
  'send.image.failure': 'T03',
  'schedule.failure': 'T04',
  'created.company.failure': 'T05',
  'not.authorized': 'T06',
  error: 'T07',
  'bad.request': 'T08',
});

const getStatusCode = () => ({
  OK: 200,
  CREATED: 201,
  ERROR: 500,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  DELETED: 204,
  BAD_REQUEST: 400,
});

const getRequestStatus = () => ({
  ptbr: {
    PROCESSING: 'processing',
    SUCCESS: 'success',
    ERROR: 'error',
  },
});

module.exports = { getMessages, getCodes, getStatusCode, getRequestStatus };
