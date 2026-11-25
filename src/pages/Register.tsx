import { useState, type FormEvent } from 'react'
import { event, links, videoQuestions } from '../data/event'
import { Countdown, LinkButton, PageHero, Section } from '../components/ui'

interface Member {
  name: string
  college: string
  branch: string
  whatsapp: string
}

const emptyMember = (): Member => ({ name: '', college: '', branch: '', whatsapp: '' })

export default function Register() {
  const [teamSize, setTeamSize] = useState(1)
  const [teamName, setTeamName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [members, setMembers] = useState<Member[]>([emptyMember()])
  const [projectTitle, setProjectTitle] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [hasCollegeId, setHasCollegeId] = useState(false)
  const [checkedQuestions, setCheckedQuestions] = useState<boolean[]>(() => videoQuestions.map(() => false))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submittedId, setSubmittedId] = useState('')

  const handleSizeChange = (size: number) => {
    setTeamSize(size)
    setMembers((prev) => {
      if (size > prev.length) {
        return [...prev, ...Array.from({ length: size - prev.length }, emptyMember)]
      }
      return prev.slice(0, size)
    })
  }

  const updateMember = (idx: number, field: keyof Member, value: string) => {
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)))
  }

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => prev.map((v, i) => (i === idx ? !v : v)))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!leadEmail.trim()) {
      setError('Enter the team lead email address.')
      return
    }
    for (let i = 0; i < teamSize; i++) {
      const m = members[i]
      if (!m.name.trim() || !m.college.trim() || !m.branch.trim() || !m.whatsapp.trim()) {
        setError(`Complete all fields for ${i === 0 ? 'Member 1 (Lead)' : `Member ${i + 1}`}.`)
        return
      }
    }
    if (!projectTitle.trim() || !liveUrl.trim() || !videoUrl.trim()) {
      setError('Enter your project title, live deployed URL, and 2-minute video link.')
      return
    }
    if (checkedQuestions.some((q) => !q)) {
      setError('Confirm that your 2-minute video covers all four required questions.')
      return
    }
    if (!hasCollegeId) {
      setError('Confirm that every participant has a physical college ID card for Round 2.')
      return
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      teamName: teamSize === 1 ? teamName.trim() || 'Solo' : teamName.trim() || `${members[0].name}'s Team`,
      teamSize,
      leadEmail: leadEmail.trim(),
      members: members.slice(0, teamSize),
      projectTitle: projectTitle.trim(),
      liveUrl: liveUrl.trim(),
      videoUrl: videoUrl.trim(),
      hasCollegeId,
    }

    setSubmitting(true)
    try {
      if (links.registrationEndpoint) {
        const res = await fetch(links.registrationEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          throw new Error('Submission failed. Please try again.')
        }
      } else {
        // Local preview storage until registrationEndpoint is configured in src/data/event.ts
        const existing = JSON.parse(localStorage.getItem('chakravyuh_registrations') || '[]')
        existing.push(payload)
        localStorage.setItem('chakravyuh_registrations', JSON.stringify(existing))
      }
      setSubmittedId(`CHK-${Date.now().toString(36).toUpperCase()}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Free for students"
        title="Register"
        sub="Solo or a team of up to 4. Any branch, any college."
      />

      <Section className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] items-start">
        {/* Left: Full In-Site Registration Form */}
        <div className="bg-obsidian/80 backdrop-blur-md border border-bronze/35 p-6 sm:p-8">
          {submittedId ? (
            <div className="py-6">
              <p className="font-mono text-xs tracking-[.18em] uppercase text-cyan">Registration recorded</p>
              <h2 className="bronze-text text-3xl sm:text-4xl font-extrabold mt-2">
                You are in the Chakravyuh.
              </h2>
              <p className="mt-3 text-[#d8d3c6]">
                Reference ID: <span className="font-mono text-gold">{submittedId}</span>
              </p>

              <dl className="mt-6 border-y border-bronze/25 py-5 grid gap-3 text-sm m-0">
                <div className="flex justify-between gap-4">
                  <dt className="font-mono uppercase text-bronze">Team</dt>
                  <dd className="m-0 text-[#f3efe6]">{teamName || members[0].name} ({teamSize} {teamSize === 1 ? 'member' : 'members'})</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-mono uppercase text-bronze">Project</dt>
                  <dd className="m-0 text-[#f3efe6]">{projectTitle}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-mono uppercase text-bronze">Shortlist</dt>
                  <dd className="m-0 text-[#f3efe6]">10–11 Dec via WhatsApp &amp; website</dd>
                </div>
              </dl>

              {!links.registrationEndpoint && (
                <p className="mt-4 font-mono text-xs text-bronze">
                  Preview mode: stored in browser localStorage until a backend endpoint is connected in src/data/event.ts.
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href={links.whatsapp} primary>Join WhatsApp community</LinkButton>
                <button
                  type="button"
                  onClick={() => setSubmittedId('')}
                  className="btn"
                >
                  Submit another entry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-7" noValidate>
              {/* 1. Team Size & Identity */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl text-gold">1. Team details</h2>
                  <div className="flex border border-bronze/40 divide-x divide-bronze/30" role="group" aria-label="Team size">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleSizeChange(n)}
                        className={`px-3.5 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                          teamSize === n ? 'bg-gold text-obsidian font-bold' : 'text-[#c9c3b4] hover:text-cyan'
                        }`}
                      >
                        {n === 1 ? 'Solo' : `${n}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="teamName" className="block font-mono text-xs uppercase tracking-[.12em] text-bronze mb-1.5">
                      Team name {teamSize === 1 && '(optional)'}
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder={teamSize === 1 ? 'Solo' : 'e.g. Codebreakers'}
                      className="w-full bg-obsidian/90 border border-bronze/35 px-3.5 py-2.5 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="leadEmail" className="block font-mono text-xs uppercase tracking-[.12em] text-bronze mb-1.5">
                      Lead email *
                    </label>
                    <input
                      id="leadEmail"
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="you@college.edu"
                      className="w-full bg-obsidian/90 border border-bronze/35 px-3.5 py-2.5 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Member Rows */}
              <div className="grid gap-5 border-t border-bronze/25 pt-6">
                <h2 className="text-2xl text-gold">2. Participants</h2>
                {members.slice(0, teamSize).map((m, i) => (
                  <fieldset key={i} className="border border-bronze/25 p-4 m-0 grid gap-3 sm:grid-cols-2">
                    <legend className="font-mono text-xs uppercase tracking-[.15em] text-cyan px-2">
                      {i === 0 ? 'Member 1 · Team Lead' : `Member ${i + 1}`}
                    </legend>
                    <input
                      type="text"
                      required
                      aria-label={`Member ${i + 1} full name`}
                      placeholder="Full name *"
                      value={m.name}
                      onChange={(e) => updateMember(i, 'name', e.target.value)}
                      className="bg-obsidian/90 border border-bronze/35 px-3 py-2 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      aria-label={`Member ${i + 1} WhatsApp number`}
                      placeholder="WhatsApp number *"
                      value={m.whatsapp}
                      onChange={(e) => updateMember(i, 'whatsapp', e.target.value)}
                      className="bg-obsidian/90 border border-bronze/35 px-3 py-2 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      aria-label={`Member ${i + 1} college name`}
                      placeholder="College name *"
                      value={m.college}
                      onChange={(e) => updateMember(i, 'college', e.target.value)}
                      className="bg-obsidian/90 border border-bronze/35 px-3 py-2 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      aria-label={`Member ${i + 1} branch`}
                      placeholder="Branch & year *"
                      value={m.branch}
                      onChange={(e) => updateMember(i, 'branch', e.target.value)}
                      className="bg-obsidian/90 border border-bronze/35 px-3 py-2 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                  </fieldset>
                ))}
              </div>

              {/* 3. Round 1 Project & Video Submission */}
              <div className="grid gap-4 border-t border-bronze/25 pt-6">
                <h2 className="text-2xl text-gold">3. Round 1 submission</h2>
                <div>
                  <label htmlFor="projectTitle" className="block font-mono text-xs uppercase tracking-[.12em] text-bronze mb-1.5">
                    Project name *
                  </label>
                  <input
                    id="projectTitle"
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Your live project title"
                    className="w-full bg-obsidian/90 border border-bronze/35 px-3.5 py-2.5 text-[#f3efe6] focus:border-cyan focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="liveUrl" className="block font-mono text-xs uppercase tracking-[.12em] text-bronze mb-1.5">
                      Live deployed URL *
                    </label>
                    <input
                      id="liveUrl"
                      type="url"
                      required
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://your-app.vercel.app"
                      className="w-full bg-obsidian/90 border border-bronze/35 px-3.5 py-2.5 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="videoUrl" className="block font-mono text-xs uppercase tracking-[.12em] text-bronze mb-1.5">
                      2-min video link (YouTube / Drive) *
                    </label>
                    <input
                      id="videoUrl"
                      type="url"
                      required
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtu.be/... or drive.google.com/..."
                      className="w-full bg-obsidian/90 border border-bronze/35 px-3.5 py-2.5 text-[#f3efe6] focus:border-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Required Confirmations */}
              <div className="grid gap-3 border-t border-bronze/25 pt-6">
                <p className="font-mono text-xs uppercase tracking-[.15em] text-cyan">
                  Confirm your 2-minute video answers all four:
                </p>
                {videoQuestions.map((q, i) => (
                  <label key={q} className="flex items-start gap-3 cursor-pointer text-[#d8d3c6]">
                    <input
                      type="checkbox"
                      checked={checkedQuestions[i]}
                      onChange={() => toggleQuestion(i)}
                      className="mt-1 accent-[#2de2e6]"
                    />
                    <span>{q}</span>
                  </label>
                ))}

                <label className="flex items-start gap-3 cursor-pointer text-[#f3efe6] pt-2 border-t border-bronze/20 mt-1">
                  <input
                    type="checkbox"
                    checked={hasCollegeId}
                    onChange={(e) => setHasCollegeId(e.target.checked)}
                    className="mt-1 accent-[#2de2e6]"
                  />
                  <span>Every member has a physical college ID card (required for Round 2 campus entry).</span>
                </label>
              </div>

              {error && (
                <p role="alert" className="border border-red-400/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {submitting ? 'Submitting...' : 'Submit registration'}
                </button>
                <span className="text-xs font-mono text-[#9a958a]">Free · Closes 8 Dec 2026</span>
              </div>
            </form>
          )}
        </div>

        {/* Right: Deadline & Community */}
        <aside className="grid gap-6">
          <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6">
            <Countdown target={event.registrationDeadline} label="Registration closes in" />
            <p className="mt-3 text-sm text-[#9a958a]">
              Deadline: 8 Dec 2026, 11:59 PM IST (time to be confirmed).
            </p>
          </div>

          <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6">
            <p className="font-mono text-xs uppercase tracking-[.15em] text-cyan">Updates &amp; Round 2</p>
            <p className="mt-2 text-[#d8d3c6]">
              Shortlisted teams are notified by WhatsApp around 10 to 11 Dec. Round 2 repo submission also runs through the WhatsApp community.
            </p>
            <div className="mt-5">
              <LinkButton href={links.whatsapp}>Join WhatsApp community</LinkButton>
            </div>
          </div>
        </aside>
      </Section>
    </>
  )
}
