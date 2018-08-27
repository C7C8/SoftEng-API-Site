import { ManageRoutingModule } from './manage-routing.module';

describe('ManageRoutingModule', () => {
  let manageRoutingModule: ManageRoutingModule;

  beforeEach(() => {
    manageRoutingModule = new ManageRoutingModule();
  });

  it('should create an instance', () => {
    expect(manageRoutingModule).toBeTruthy();
  });
});
