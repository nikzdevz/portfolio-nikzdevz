import type { SceneKind } from '../types';

const Cinema = () => (
  <>
    <div className="cinema-screen surface surface--teal">
      <div className="cinema-screen__top">
        <span className="scene-label">KS / Cinema room</span>
        <span className="scene-pill">Live room</span>
      </div>
      <div className="cinema-screen__title">
        <p className="scene-heading">The screening is about to begin.</p>
        <p>A shared room, one playback, many reactions.</p>
      </div>
    </div>
    <div className="cinema-seats" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((seat) => <span className="cinema-seat" key={seat} />)}
    </div>
    <div className="cinema-ticket surface surface--copper">
      <span className="scene-label">Private screening</span>
      <strong className="cinema-ticket__code">KS-0626</strong>
      <span className="scene-label">Ticket / room access</span>
      <i className="cinema-ticket__tear" aria-hidden="true" />
    </div>
    <div className="cinema-reaction">+ rose shower</div>
    <span className="cinema-ribbon">Together, in sync</span>
  </>
);

const Android = () => (
  <>
    <div className="android-main surface">
      <div className="android-toolbar">
        <span>DroidLabZ / canvas</span>
        <span>Visual build</span>
      </div>
      <div className="android-workspace">
        <div className="android-block android-block--app">
          <span className="scene-label">App screen</span>
          <strong className="scene-subheading">Compose an interface</strong>
          <span className="android-block__dots" aria-hidden="true"><i /><i /><i /></span>
        </div>
        <i className="android-block__wire android-block__wire--one" aria-hidden="true" />
        <i className="android-block__wire android-block__wire--two" aria-hidden="true" />
        <div className="android-block android-block--logic">
          <span className="scene-label">Logic</span>
          <strong className="scene-subheading">Connect the flow</strong>
        </div>
        <div className="android-block android-block--component">
          <span className="scene-label">Component</span>
          <strong className="scene-subheading">Ready to test</strong>
        </div>
        <div className="android-tray" aria-hidden="true">
          <span>Interface</span>
          <span>Logic</span>
          <span>Data</span>
          <span>Test</span>
        </div>
      </div>
    </div>
    <div className="android-badge">Idea to Android</div>
  </>
);

const Desk = () => (
  <>
    <div className="desk-table" aria-hidden="true" />
    <div className="desk-panel desk-panel--left">
      <div className="desk-panel__head">
        <span className="scene-label">Read</span>
        <span className="scene-pill">Recap</span>
      </div>
      <div className="desk-panel__body">
        <div className="desk-list">
          <span>Last session</span>
          <span>Key concepts</span>
          <span>Your notes</span>
        </div>
      </div>
    </div>
    <div className="desk-panel desk-panel--center">
      <div className="desk-panel__head">
        <span className="scene-label">Orbit / today</span>
        <span className="scene-pill">Present</span>
      </div>
      <div className="desk-panel__body">
        <strong className="scene-heading">Where are you?</strong>
        <div className="desk-progress">
          <div className="desk-progress__bar"><i /></div>
          <span className="scene-label">Syllabus / in progress</span>
        </div>
        <div className="desk-list">
          <span>Current topic</span>
          <span>Next up</span>
        </div>
      </div>
    </div>
    <div className="desk-panel desk-panel--right">
      <div className="desk-panel__head">
        <span className="scene-label">Next</span>
        <span className="scene-pill">Prepare</span>
      </div>
      <div className="desk-panel__body">
        <div className="desk-syllabus">
          <span>01 / recap</span>
          <span>02 / learn</span>
          <span>03 / explain back</span>
        </div>
      </div>
    </div>
    <div className="desk-camera">Cam</div>
    <div className="desk-teach">Your turn to teach</div>
    <i className="desk-beacon" aria-hidden="true" />
  </>
);

const Classified = () => (
  <>
    <div className="classified-vault">
      <div className="classified-vault__head">
        <span className="scene-label">Stack Labs / dossier</span>
        <span className="scene-label">Sealed</span>
      </div>
      <div className="classified-vault__center">
        <div className="classified-vault__seal">CLASSIFIED</div>
        <p className="classified-vault__text">
          A complete package is taking shape behind the seal. Its details stay under wraps.
        </p>
      </div>
      <div className="classified-vault__foot">
        <span>Access pending</span>
        <span>Look closer later</span>
      </div>
    </div>
    <div className="classified-slab">
      <i className="classified-slab__slash" aria-hidden="true" />
      <span className="classified-slab__copy">A surprise<br />in the making</span>
    </div>
  </>
);

const Beacon = () => (
  <div className="beacon-field">
    <i className="beacon-sweep" aria-hidden="true" />
    <span className="beacon-pin beacon-pin--one">01</span>
    <span className="beacon-pin beacon-pin--two">02</span>
    <span className="beacon-pin beacon-pin--three">03</span>
    <span className="beacon-pin beacon-pin--four">04</span>
    <div className="beacon-center surface surface--copper">
      <span className="scene-label">BEAN / presence layer</span>
      <strong className="scene-heading">Attendance, detected.</strong>
      <span className="scene-label">Mobile + beacon</span>
    </div>
    <div className="beacon-count">
      <strong>Here</strong>
      <span>Room is present</span>
    </div>
  </div>
);

export const SceneInstrument = ({ scene }: { scene: SceneKind }) => (
  <div className="scene-instrument__core">
    {scene === 'cinema' && <Cinema />}
    {scene === 'android' && <Android />}
    {scene === 'desk' && <Desk />}
    {scene === 'classified' && <Classified />}
    {scene === 'beacon' && <Beacon />}
  </div>
);
