field = null
window.addEventListener('beforeunload', function () {
  d = new Date();
  storage.setItem('lastOn', d.getTime());
})
storage = window.localStorage;
spinner = ['!', '@', '#', '$', '%', '&', '*'];
function load() {
  document.getElementById('work').addEventListener('click', function (e) {
  changeMoney(1);
  });
  document.getElementById('work').addEventListener('keydown', function (e) {
    var key = e.keyCode || e.charCode;
    if (key == 13) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

  if(storage.length < 9) {
    storage.setItem('money',0);
    storage.setItem('pool',0);
    storage.setItem('stocks',0);
    storage.setItem('stockprice',10);
    storage.setItem('bots',0)
    storage.setItem('botprice',100)
    storage.setItem('minepool',0)
    storage.setItem('odds',0)
    d = new Date();
    storage.setItem('lastOn', d.getTime());
  }
  money = parseInt(storage.getItem('money'));
  pool = parseInt(storage.getItem('pool'));
  stocks = parseInt(storage.getItem('stocks'));
  stockprice = parseInt(storage.getItem('stockprice'));
  bots = parseInt(storage.getItem('bots'));
  botprice = parseInt(storage.getItem('botprice'));
  minepool = parseInt(storage.getItem('minepool'));
  odds = parseInt(storage.getItem('odds'))
  winnings = 0
  spinning = false
  refresh();
  backOnline();
  tick = 0
  clock = setInterval(time,1000);
}

function backOnline() {
  d = new Date();
  cur = d.getTime();
  diff = cur - parseInt(storage.getItem('lastOn'));
  diff = Math.floor(diff/1000);
  newmoney = bots * diff;
  if(newmoney > money) {
    newmoney = money;
  }
  changeMoney(newmoney);
}

function refresh() {
  updateWorth();
  updateMoney();
  updatePool();
  updateStockPrice();
  updateStocks();
  updateBots();
  updateBotPrice();
  updateMinePool();
  updateOdds();
  resetMinefield();
  updateTicketPrice();
}
function reset() {
  clearInterval(clock);
  storage.clear();
  load();
}
function changeMoney(inc) {
  money = money + inc;
  updateMoney();
}
function updateMinePool() {
document.getElementById('minepool').innerHTML = minepool;
storage.setItem('minepool',minepool);
}
function updateWorth() {
  document.getElementById("worth").innerHTML = money + pool + minepool + (stocks * stockprice);
  updateStockValue()
}
function updateMoney() {
  document.getElementById("money").innerHTML = money;
  storage.setItem('money',money);
  updateWorth();
}
function updatePool() {
  document.getElementById("pool").innerHTML = pool;
  storage.setItem('pool',pool);
  updateWorth();
}
function updateStockPrice() {
  document.getElementById("stockprice").innerHTML = stockprice;
  storage.setItem('stockprice',stockprice);
  updateWorth();
}
function updateStocks() {
  document.getElementById("stocks").innerHTML = stocks;
  storage.setItem('stocks',stocks);
  updateWorth();
}
function updateStockValue() {
  document.getElementById("stockvalue").innerHTML = stocks * stockprice;
}
function updateBots() {
  document.getElementById("bots").innerHTML = bots;
  storage.setItem('bots',bots);
}
function updateBotPrice() {
  document.getElementById("botprice").innerHTML = botprice;
  storage.setItem('botprice',botprice);
}
function updateOdds() {
  document.getElementById('odds').innerHTML = odds;
  storage.setItem('odds',odds);
}
function updateTicketPrice() {
  digits = 0;
  mon = parseInt(document.getElementById("worth").innerHTML);
  while(mon >= 1) {
    digits += 1;
    mon = Math.floor(mon/10);
  }
  ticketprice = 10 ** (digits - 3)
  if(ticketprice < 1) {
    ticketprice = 1
  }
  document.getElementById('jackpot').innerHTML = 10 **(digits + 1)
  document.getElementById("ticketprice").innerHTML = ticketprice;
}
function updateSpinwin() {
  document.getElementById('spinwin').innerHTML = winnings;
}
function increasePool(num) {
  if(num == 0) {
    pool += money
    money = 0
  } else {
    if(money >= num) {
      pool += num
      money -= num
    }
  }
  updateMoney();
  updatePool();
}
function decreasePool(num) {
  if(num == 0) {
    money += pool
    pool = 0
  } else {
    if(pool >= num) {
      pool -= num
      money += num
    }
  }
  updateMoney();
  updatePool();
}
function flip() {
  document.getElementById("flipwinner").innerHTML = " ";
  num = Math.floor(Math.random() * 2);
  if(num == 0) {
    document.getElementById("flipwinner").innerHTML = "Lose!";
    pool = 0
    updatePool();
  }
  if(num == 1) {
    document.getElementById("flipwinner").innerHTML = "Win!";
    pool = pool + pool
    updatePool();
  }
}
function buyStocks(num) {
  if(num == 0) {
    while(money >= stockprice) {
      money = money - stockprice;
      stocks = stocks + 1;
    }
  } else {
    if(money >= (num * stockprice)) {
      stocks = stocks + num
      money = money - (num * stockprice)
    }
  }
  updateMoney();
  updateStocks();
}
function sellStocks(num) {
  if(num == 0) {
    money = money + (stocks * stockprice)
    stocks = 0
  } else {
    if(stocks >= num) {
      stocks = stocks - num
      money = money + (num * stockprice)
    }
  }
  updateMoney();
  updateStocks();
}
function changeStockPrice() {
  num = Math.floor(Math.sqrt((Math.random() * 49)));
  num = 7 - num
  sign = Math.floor(Math.random() * 2)
  if(sign == 0 && stockprice > 7) {
    stockprice = stockprice - num
  } else {
    stockprice = stockprice + num
  }
  updateStockPrice();
}
function textInput() {
  input = document.getElementById("inputbox").value;
  eval(input);
}
function buyBots(num) {
  if(num == 0) {
    while(money >= botprice) {
      money -= botprice;
      changeBotPrice();
      bots = bots + 1
    }
  } else {
    for(i = 0; i < num; i++) {
      if(money < botprice) {break;}
      money -= botprice;
      changeBotPrice();
      bots = bots + 1;
    }
  }
  updateMoney();
  updateBots();
}
function changeBotPrice() {
  botprice = Math.floor(botprice * 1.05);
  updateBotPrice();
}
function increaseMinePool(num) {
  if(num == 0) {
    minepool += money
    money = 0
  } else {
    if(money >= num) {
      minepool += num
      money -= num
    }
  }
  updateMoney();
  updateMinePool();
}
function decreaseMinePool(num) {
  if(num == 0) {
    money += minepool
    minepool = 0
  } else {
    if(minepool >= num) {
      minepool -= num
      money += num
    }
  }
  updateMoney();
  updateMinePool();
}
function resetMinefield() {
  for(i = 1; i <= 16; i++) {
    document.getElementById("but" + i).innerHTML = "&nbsp";
  }
}
function makeField() {
  resetMinefield();
  field = [];
  for(i=0;i<16;i++) {
    field.push(false)
  }
  mines = parseInt(document.querySelector('input[name="mines"]:checked').value);
  left = mines;
  while(left != 0) {
    num = Math.floor(Math.random() * 16);
    if(!field[num]) {
      field[num] = true;
      left--;
    }
  }
}
function testMine(mine) {
  if(field && mine.innerHTML == "&nbsp;") {
    id = parseInt(mine.id.substring(3));
    if(field[id - 1]) {
      mine.innerHTML = "X";
      minepool = 0;
      field = null;
    } else {
      mine.innerHTML = "O";
      minepool = Math.floor(minepool * (mines/2.7))
    }
    updateMinePool();
  }
}
function buyTicket(num) {
  for(i=0;i<num;i++) {
    if(money >= ticketprice) {
      money = money - ticketprice;
      odds++;
    } else {
      break;
    }
  }
  updateOdds();
  updateMoney();
}
function drawLottery() {
  num = Math.floor(Math.random() * 1000);
  if(num < odds) {
    document.getElementById('lotterywinner').innerHTML = "YOU WON $1000000!";
    changeMoney(1000000);
  } else {
    document.getElementById('lotterywinner').innerHTML = "YOU LOST!";
  }
  odds = 0
  updateTicketPrice()
  updateOdds();
}
function time() {
  tick = tick + 1
  document.getElementById('countdown').innerHTML = 30 - tick;
  if(tick == 3){
    document.getElementById('lotterywinner').innerHTML = "Waiting...";
  }
  if(tick % 5 == 0) {
    changeStockPrice();
  }
  changeMoney(bots);
  if(tick == 30) {
    tick = 0;
    drawLottery();
  }
}
function spin() {
  if(money < 15 || spinning) {
    return;
  }
  changeMoney(-15);
  spinning = true;
  boxes = document.getElementsByClassName('spinner');
  for(o=0;o<20;o++) {
    setTimeout(function(){
      for(i=0;i<3;i++) {
        rand = Math.floor(Math.random() * 7);
        boxes[i].innerHTML = spinner[rand]
      }
    }, 50 * o);
  }
  setTimeout(function() {
    box1 = boxes[0].innerHTML;
    box2 = boxes[1].innerHTML;
    box3 = boxes[2].innerHTML;
    winnings = 0
    if(box1 == box2 && box2 == box3) {
      if(box1 == '$') {
        winnings = 500
      } else {
        winnings = 200
      }
    } else if(box1 == box2 || box2 == box3 || box1 == box3) {
      if((box1 == box2 && box1 == '$') || (box1 == box3 && box1 == '$') || (box3 == box2 && box3 == '$')) {
        winnings = 75
      } else {
        winnings = 20
      }
    }
    updateSpinwin();
    changeMoney(winnings);
    spinning = false
  }, 1000)
}
function resetAlert() {
  if(confirm("Are you sure you want to reset your game?")) {
    reset()
  }
}