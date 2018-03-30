module.exports = function getTeDivisor(avgRank){
    var divisor = 0;
    if (avgRank <= 2){
      divisor = divisor + 4
    }
    else if(avgRank > 2 && avgRank <= 5){
      divisor = divisor + 4.5
    }
    else if(avgRank > 5 && avgRank <= 10){
      divisor = divisor + 5
    }
    else{
      divisor = divisor + 6
    }
    return divisor;
  }