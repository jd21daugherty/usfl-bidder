module.exports = function getRbDivisor(avgRank){
    var divisor = 0;
    if (avgRank <= 10){
      divisor = divisor + 4
    }
    else if(avgRank > 10 && avgRank <= 20){
      divisor = divisor + 4.5
    }
    else if(avgRank > 20 && avgRank <= 25){
      divisor = divisor + 5
    }
    else if(avgRank > 25 && avgRank <= 40){
      divisor = divisor + 5.5
    }
    else{
      divisor = divisor + 6
    }
    return divisor;
  }