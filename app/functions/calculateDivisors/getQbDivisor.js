module.exports = function getQbDivisor(avgRank){
    var divisor = 0;
    if (avgRank <= 5){
      divisor = divisor + 4
    }
    else if (avgRank > 5 && avgRank <= 10){
      divisor = divisor + 5
    }
    else if (avgRank > 10 && avgRank <= 20) {
      divisor = divisor + 6
    }
    else {
      divisor = divisor + 7
    }
  
    return divisor;
  }