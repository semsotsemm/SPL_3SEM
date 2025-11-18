  (function(){
    const taskPrograms = {
      1: function(){
        function makeCounter(){
          let currentCount = 1;
          return function(){
            return currentCount++;
          };
        }
        const counter = makeCounter();
        const v1a = counter();
        const v1b = counter();
        const v1c = counter();
        const v1d = counter();
        const seq1 = [v1a, v1b, v1c, v1d];
        seq1.forEach((v, i) => setTimeout(() => console.log('Вариант 1:', v), 1000 * (i + 1)));

        let currentCount = 1;
        function makeCounter2(){
          return function(){
            return currentCount++;
          };
        }
        const counter2 = makeCounter2();
        const counter3 = makeCounter2();
        const v2a = counter2();
        const v2b = counter2();
        const v2c = counter3();
        const v2d = counter3();
        const seq2 = [v2a, v2b, v2c, v2d];
        seq2.forEach((v, i) => setTimeout(() => console.log('Вариант 2:', v), 4000 + 1000 * i));  
      },
      2: function(){
        const volume = a => b => c => a*b*c;
        const withA5 = volume(5); 
        console.log('5*2*3 =', withA5(2)(3));
        console.log('5*4*1 =', withA5(4)(1));
      },
      3: function(){
        function* moveGenerator(startX=0, startY=0){
          let x = startX, y = startY;
          while(true){
            const dir = yield {x, y};
            const steps = 10;
            for(let i=0;i<steps;i++){
              if(dir === 'left') x -= 1;
              else if(dir === 'right') x += 1;
              else if(dir === 'up') y += 1;
              else if(dir === 'down') y -= 1;
              console.log('coord:', x, y);
            }
          }
        }
        const g = moveGenerator(0,0);
        g.next(); 
        let cmd;
        for(let k=0;k<3;k++){ 
          cmd = prompt('Введите команду: left, right, up, down');
          if(!cmd) break;
          g.next(cmd.trim());
        }
        console.log('Генератор завершён или команда не введена');
      },
      4: function(){
        window.demoVar = 42;
        window.demoFn = function(name){ return 'Hi, '+name; };
        const globals = Object.getOwnPropertyNames(window)
          .filter(k => /^(demoVar|demoFn)$/.test(k));
        console.log('Найдены в window:', globals.map(k => [k, window[k]]));
        window.demoVar = 100;
        window.demoFn = function(name){ return 'Hello, '+name+'!'; };
        console.log('После переопределения:', window.demoVar, window.demoFn('JS'));
      }
    };
    function createSandboxConsole(print){
      return {
        log: (...args) => print(args.map(format).join(' ') + '\n'),
        info: (...args) => print(args.map(format).join(' ') + '\n'),
        warn: (...args) => print('[warn] ' + args.map(format).join(' ') + '\n'),
        error: (...args) => print('[error] ' + args.map(format).join(' ') + '\n'),
      };
    }

    function format(v){
      try{
        if (typeof v === 'string') return v;
        if (typeof v === 'function') return v.toString();
        return JSON.stringify(v, replacer, 2);
      }catch(e){
        return String(v);
      }
    }

    function replacer(_, value){
      if (value instanceof Error) {
        return { name: value.name, message: value.message, stack: value.stack };
      }
      return value;
    }

    function runCode(code, print){
      const sandboxConsole = createSandboxConsole(print);
      const wrapped = `(function(){\n  const console = sandboxConsole;\n  ${code}\n})();`;
      try{
        const fn = new Function('sandboxConsole', wrapped);
        fn(sandboxConsole);
      }catch(err){
        print(`[throw] ${err && err.stack ? err.stack : err}` + '\n');
      }
    }

    function bindCard(card){
      const btn = card.querySelector('.run_btn');
      const out = card.querySelector('.output');
      if (!btn || !out)
        {
        return;
        }
      const print = (text) => { out.textContent += text; };
      btn.addEventListener('click', () => {
        out.textContent = '';
        const taskId = card.getAttribute('data-task');
        const program = taskPrograms[taskId];
        if (typeof program === 'function')
        {
          const code = '(' + program.toString() + ')();';
          runCode(code, print);
        }
        else {
          print('Для этой карточки не задан код.\n');
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.task_card').forEach(bindCard);
    });
  })();