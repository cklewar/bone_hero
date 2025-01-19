export default function enemyStateManager() {
    let instance = null;

    function createInstance() {
      const maxHealth = 3;
      let health = maxHealth;


      return {
        getMaxHealth: () => maxHealth,
        setHealth(value) {
          health = value;
        },
        getHealth: () => health,
      };
    }

    return {
      getInstance() {
        /*if (!instance) {
          instance = createInstance();
        }*/
        instance = createInstance();
        return instance;
      },
    };
  }

//export const enemyState = enemyStateManager().getInstance();
export const enemyState = enemyStateManager();