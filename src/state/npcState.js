export default function npcStateManager() {
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
        if (!instance) {
          instance = createInstance();
        }

        return instance;
      },
    };
  }

export const npcState = npcStateManager().getInstance();