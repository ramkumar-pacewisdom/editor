import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QumlPlayerComponent } from './quml-player.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../services/config/config.service';
import { PlayerService } from '../../services/player/player.service';
import { EditorService } from '../../services/editor/editor.service';
import { mockData } from './quml-player.component.spec.data';
describe('QumlPlayerComponent', () => {
  let component: QumlPlayerComponent;
  let fixture: ComponentFixture<QumlPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [QumlPlayerComponent],
      providers: [ConfigService, PlayerService, EditorService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QumlPlayerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#ngOnInit() should call initialize', () => {
    component.qumlPlayerConfig = mockData.qumlPlayerConfig;
    component.qumlPlayerConfig.mockData = mockData.qumlPlayerConfig.metadata;
    spyOn(component, 'initialize');
    component.ngOnInit();
    expect(component.initialize).toHaveBeenCalled();
  });
  it('#initialize() should set showPreview', () => {
    component.showPreview = false;
    component.qumlPlayerConfig = mockData.qumlPlayerConfig;
    spyOn(component, 'setQumlPlayerData');
    component.initialize();
    expect(component.showPreview).toBeTruthy();
  });
  it('#setQumlPlayerData() should call setQumlPlayerData and isSingleQuestionPreview is false', () => {
    const playerService = TestBed.inject(PlayerService);
    const editorService = TestBed.inject(EditorService);
    component.qumlPlayerConfig = mockData.qumlPlayerConfig;
    component.questionSetHierarchy = mockData.qumlPlayerConfig.metadata;
    component.qumlPlayerConfig.metadata = mockData.qumlPlayerConfig.metadata;
    component.isSingleQuestionPreview = false;
    spyOn(playerService, 'getQumlPlayerConfig').and.returnValue(mockData.qumlPlayerConfig);
    spyOn(editorService, 'getContentChildrens').and.returnValue(['do_12345', 'do_123456']);
    component.setQumlPlayerData();
    expect(component.qumlPlayerConfig.metadata).toEqual(mockData.qumlPlayerConfig.metadata);
    // expect(component.qumlPlayerConfig.metadata.totalQuestions).toEqual(mockData.qumlPlayerConfig.metadata.childNodes.length);
    expect(component.qumlPlayerConfig.metadata.maxQuestions).toEqual(mockData.qumlPlayerConfig.metadata.maxQuestions);
    expect(component.qumlPlayerConfig.metadata.maxScore).toEqual(mockData.qumlPlayerConfig.metadata.maxScore);
  });
  it('#setQumlPlayerData() should call setQumlPlayerData and isSingleQuestionPreview is true', () => {
    const playerService = TestBed.inject(PlayerService);
    const editorService = TestBed.inject(EditorService);
    spyOn(playerService, 'getQumlPlayerConfig').and.returnValue(mockData.qumlPlayerConfig);
    spyOn(editorService, 'getContentChildrens').and.returnValue(['do_12345', 'do_123456']);
    component.qumlPlayerConfig = mockData.qumlPlayerConfig;
    component.questionSetHierarchy = mockData.qumlPlayerConfig.metadata;
    component.qumlPlayerConfig.metadata = mockData.qumlPlayerConfig.metadata;
    component.isSingleQuestionPreview = true;
    component.setQumlPlayerData();
    expect(component.isSingleQuestionPreview).toBeTruthy();
    expect(component.qumlPlayerConfig).toBeDefined();
  });
  it('#getPlayerEvents() should call getPlayerEvents', () => {
    spyOn(component, 'getPlayerEvents').and.callFake(() => {});
    component.getPlayerEvents(mockData.playerEvent);
    expect(component.getPlayerEvents).toHaveBeenCalled();
  });
  it('#getTelemetryEvents() should call getTelemetryEvents', () => {
    spyOn(component, 'getTelemetryEvents').and.callFake(() => {});
    component.getTelemetryEvents(mockData.telemetryEvent);
    expect(component.getTelemetryEvents).toHaveBeenCalled();
  });

  it('#ngAfterViewInit() Should init and load the QuML player', () => {
    component.qumlPlayer = { nativeElement: { append: ()=> { }}}
    component.ngAfterViewInit();
    expect(component.qumlPlayer).toBeTruthy();
  });

  it('#reviewQuestion() should emit the event', () => {
    spyOn(component.toolbarEmitter, 'emit');
    component.reviewQuestion();
    expect(component.toolbarEmitter.emit).toHaveBeenCalledWith({});
  });
  
  it('#getPlayerEvents() should print the event in the console log', () => {
    spyOn(window.console, 'log');
    component.getPlayerEvents({type: 'interact'});
    expect(window.console.log).toHaveBeenCalled();
  });

  it('#getTelemetryEvents() should print the event in the console log', () => {
    spyOn(window.console, 'log');
    component.getTelemetryEvents({type: 'interact'});
    expect(window.console.log).toHaveBeenCalled();
  });
});
