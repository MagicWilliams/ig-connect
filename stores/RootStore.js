import ContentfulStore from './ContentfulStore';
import FirebaseStore from './FirebaseStore';

class RootStore {
  constructor() {
    this.contentfulStore = new ContentfulStore(this);
    this.firebaseStore = new FirebaseStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
