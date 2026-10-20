// Illustrated covers drawn in HTML/CSS so every project has an on-brand visual.
// They scale with their container (sized in container-query units). Swap for real shots whenever ready.

function Finance() {
  return (
    <>
      <div className="pc-phone pc-tilt-l">
        <div className="pc-status"><i /><i /></div>
        <p className="pc-hi">Good evening, Riya</p>
        <p className="pc-big">₹48,250</p>
        <p className="pc-sub">safe to spend this month</p>
        <div className="pc-buckets">
          <span style={{ "--c": "#F5A000", "--p": "72%" }}><b>Rent</b></span>
          <span style={{ "--c": "#0B4F5E", "--p": "40%" }}><b>Future</b></span>
          <span style={{ "--c": "#DF5227", "--p": "88%" }}><b>Fun</b></span>
        </div>
        <div className="pc-row"><i style={{ width: "62%" }} /></div>
        <div className="pc-row"><i style={{ width: "38%" }} /></div>
        <div className="pc-cta">Add to goal</div>
      </div>
      <div className="pc-float pc-float--a">
        <span className="pc-emoji" aria-hidden="true">🎉</span>
        <div>
          <b>Goal reached!</b>
          <small>Goa trip · ₹30,000</small>
        </div>
      </div>
      <div className="pc-float pc-float--b">
        <svg viewBox="0 0 120 44" aria-hidden="true"><path d="M2 40 C 20 36, 26 18, 44 22 S 70 8, 84 14 S 108 4, 118 2" fill="none" stroke="#0B4F5E" strokeWidth="4" strokeLinecap="round" /></svg>
        <small>+12% saved</small>
      </div>
    </>
  );
}

function Health() {
  const slots = [
    { t: "Morning", s: "8:00", pills: ["#F5A000", "#9ED4CB"], done: true },
    { t: "Afternoon", s: "13:30", pills: ["#DF5227"], done: true },
    { t: "Night", s: "21:00", pills: ["#0B4F5E", "#F8CC78", "#9ED4CB"], done: false }
  ];
  return (
    <>
      <div className="pc-phone pc-tilt-r">
        <div className="pc-status"><i /><i /></div>
        <p className="pc-hi">Tuesday</p>
        <p className="pc-big pc-big--sm">Today’s care</p>
        {slots.map((s) => (
          <div key={s.t} className={`pc-slot ${s.done ? "is-done" : ""}`}>
            <div>
              <b>{s.t}</b>
              <small>{s.s}</small>
            </div>
            <div className="pc-pills">
              {s.pills.map((c, i) => <i key={i} style={{ "--c": c }} />)}
            </div>
            <span className="pc-check">{s.done ? "✓" : ""}</span>
          </div>
        ))}
        <div className="pc-cta pc-cta--teal">I took my meds</div>
      </div>
      <div className="pc-float pc-float--c">
        <span className="pc-ring" style={{ "--p": "76%" }} />
        <div>
          <b>76%</b>
          <small>on track this week</small>
        </div>
      </div>
      <div className="pc-float pc-float--d">
        <b>Aa</b>
        <small>24pt min · AAA</small>
      </div>
    </>
  );
}

function System() {
  return (
    <div className="pc-board">
      <div className="pc-tile pc-tile--swatches">
        {["#063641", "#0B4F5E", "#477B85", "#9ED4CB", "#F5A000", "#DF5227"].map((c) => (
          <i key={c} style={{ background: c }} />
        ))}
      </div>
      <div className="pc-tile pc-tile--type">
        <b>Aa</b>
        <small>Prism Sans · 12 / 14 / 16 / 20 / 28</small>
      </div>
      <div className="pc-tile pc-tile--btns">
        <span className="pc-btn pc-btn--1">Dispatch</span>
        <span className="pc-btn pc-btn--2">Reroute</span>
        <span className="pc-btn pc-btn--3">Cancel</span>
      </div>
      <div className="pc-tile pc-tile--chart">
        {[40, 72, 55, 90, 64, 80, 46].map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="pc-tile pc-tile--input">
        <small>Shipment ID</small>
        <span>LF-2048-MUM<em /></span>
        <div className="pc-toggle"><i /></div>
      </div>
      <span className="pc-badge">Prism 2.0</span>
    </div>
  );
}

const covers = { finance: Finance, health: Health, system: System };

export default function ProjectCover({ project, className = "" }) {
  const Cover = covers[project.cover];
  const { wash, frame, ink, spark } = project.palette;
  return (
    <div
      className={`pc pc--${project.cover} ${className}`}
      style={{ "--wash": wash, "--frame": frame, "--ink": ink, "--spark": spark }}
      role="img"
      aria-label={`Illustration for ${project.title}`}
    >
      <div className="pc-inner">
        <Cover />
      </div>
    </div>
  );
}
