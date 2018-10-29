const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const movieStar = star => {
  let starList = [];
  //let temp = 0;//判断是否全是0,若是则返回空数组
  //取第一位
  let num = star.toString().substring(0,1);
  for(let i = 1; i <= 5; i++){
    //通过给数组添加1和0,渲染时用if判断加载哪种图片
    if(i <= num) starList.push(1);
    else {
      starList.push(0);
      //temp += 1;
    }
  }
  //if(temp == 5) starList = [];
  return starList;
}

//获取视窗宽高
const getStyle = () => {
  let array = [];
  wx.getSystemInfo({
    success: function (res) {
      array[0] = res.windowWidth * 0.3,
      array[1] = array[0] * 1.4
    }
  });
  return array;
}

//发送请求函数
const requestFn = movieUrl => {
  //let data = '';
  wx.request({
    url: movieUrl,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success(res) {
      return res.data;
      //console.log(res.data);
    },
    fail(error) {
      return error;
      //console.log(error);
    }
  })
}

//处理数据函数
const dealFn = (subjects,key,category,list) => {
  let temp = {};
  //movies.subjects
  for (let index in subjects) {
    let subject = subjects[index];
    let title = subject.title;
    let score = subject.rating.average;
    if (score == '0') { score = '暂无评分';}
    let starStyle,pos;
    if (movieStar(subject.rating.stars).indexOf(1) < 0) {
      starStyle = 0;
      pos = 'absolute';
    }
    else{
      starStyle = 100;
      pos = 'static';
    }
    temp = {
      title: title.length > 8 ? title.substring(0, 8) + '...' : title,
      average: score,
      //average: score,
      star: movieStar(subject.rating.stars),
      coverageUrl: subject.images.large,
      movieId: subject.id,
      category: category,
      starStyle: starStyle,
      pos: pos
    };
    list.push(temp);
  }
  return list;
}

module.exports = {
  formatTime: formatTime,
  movieStar: movieStar,
  getStyle: getStyle,
  requestFn: requestFn,
  dealFn: dealFn
}
