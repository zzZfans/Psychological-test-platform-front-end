import Mock from 'mockjs2'

Mock.mock(/\/api\/audio\/analysis/, 'post', {

  'success': true,
  'code': 200,
  'message': 'OK',
  'result': {
    audioUrl: 'https://bytedance.org/123123123.wav',
    audioEmotion: 'happy',
    audioText: '我太高兴了',
    textEmotion: 'happy'
  },
  'time': '2022-05-06T23:35:40.689'

})
