import { Random } from '@woowacourse/mission-utils';
import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    function splitUserInput(userInput) {
      return userInput.split(',').map(car => car.trim());
    }

    function validateCar(car, raceCars) {
      if (car.length > 5) {
        throwError(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
      }

      if (car in raceCars) {
        throwError(ERROR_MESSAGES.CAR_ALREADY_EXISTS(car));
      }
    }

    function addCar(car, raceCars) {
      validateCar(car, raceCars)
      raceCars[car] = '';
      return true;
    }

    async function getRaceCar() {
      const userInput = await Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분, 최대 5글자, 공백 제외)\n'
      );

      const cars = splitUserInput(userInput);
      let raceCars = {};

      cars.forEach(car => addCar(car, raceCars));

      return 'success'
    }
    
    const ERROR_MESSAGES = {
      CAR_NAME_TOO_LONG: "자동차 이름은 최대 5글자여야 합니다.", 
      CAR_ALREADY_EXISTS: (car) => `중복된 참가자가 있습니다: "${car}"`,

    };

    function throwError(errorMessage) {
      throw new Error(`[ERROR] ${errorMessage}`);
    }

    const raceCarStatus = await getRaceCar();

    if(raceCarStatus==='success'){
      getAttemptCount()
    }

    async function getAttemptCount() {
      const attemptCount = await Console.readLineAsync(
        '원하는 이동 횟수를 입력하세요.(움직이는 칸 수와 무관)\n'
      );
    }
  }
}

export default App;
