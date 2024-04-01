import request from '@/utils/http/request';

const Api = {
  HistoryList: '/basic-api/history',
  BasicData: '/basic-api/dashboardBasic',
};

export const getHistoryList = () => {
  return request.get(Api.HistoryList, null, {
    requestOptions: { isTransformResponse: false },
  });
};

export const getBasicData = () => {
  return request.get(Api.BasicData);
};
