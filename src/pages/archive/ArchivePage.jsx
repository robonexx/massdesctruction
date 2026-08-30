import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import BGMedia from '../../assets/images/bg_media.png'
import BGGuestbook from '../../assets/images/bg_guestbook.png'
import BGLinks from '../../assets/images/bg_links.png'
import BGMobile from '../../assets/images/bg_mobile.png'
import { archiveLinks, interviews } from '../../data/archive'
import './archive.scss'

const Page = ({ title, eyebrow = 'Mass Destruction Archive', background = BGMedia, children }) => {
  const desktop = useIsDesktop()

  return (
    <>
      <img src={desktop ? background : BGMobile} alt="" className="bg_main" />
      <main className="archive-page">
        <p className="archive-eyebrow">{eyebrow}</p><h1>{title}</h1>{children}
      </main>
    </>
  )
}

export const Articles = () => (
  <Page title="INTERVIEWS">
    <p className="archive-lead">Röster ur funk- och streetdance-scenen, bevarade från originalwebbplatsen.</p>
    <div className="archive-grid">{interviews.map((article) => (
      <Link className="archive-card" to={`/articles/${article.slug}`} key={article.slug}>
        <span>{article.date}</span><h2>{article.name}</h2><p>{article.intro}</p><strong>Läs intervjun →</strong>
      </Link>
    ))}</div>
  </Page>
)

export const ArticleDetails = () => {
  const { slug } = useParams()
  const article = interviews.find((item) => item.slug === slug)
  if (!article) return <Page title="Intervjun hittades inte"><Link to="/articles">Till alla intervjuer</Link></Page>
  return (
    <Page title={article.name} eyebrow={`Interview · ${article.date}`}>
      <p className="archive-lead">{article.intro}</p>
      <section className="article-body"><h2>Ur originalarkivet</h2><p>Den här intervjun är återfunnen i den arkiverade versionen av massdestruction.se. Originalets teman och sammanhang är bevarade här medan hela textmaterialet restaureras.</p><ul>{article.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><p className="archive-note">Fullständig transkribering från originalets HTML är nästa restaureringssteg.</p></section>
      <Link className="back-link" to="/articles">← Alla intervjuer</Link>
    </Page>
  )
}

export const LinksPage = () => (
  <Page title="LINKS" background={BGLinks}><p className="archive-lead">Originalets länksamling. Vissa äldre webbplatser kan ha flyttat eller försvunnit.</p><div className="link-list">{archiveLinks.map(([name, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}><span>{name}</span><small>{url}</small></a>)}</div></Page>
)

export const Guestbook = () => {
  const [entries, setEntries] = useState([])
  const [notice, setNotice] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name').trim()
    const message = form.get('message').trim()
    if (!name || !message) return
    setEntries((current) => [{ name, message, date: new Date().toLocaleDateString('sv-SE') }, ...current])
    setNotice('Inlägget syns i denna session. Databaskoppling återstår innan det kan sparas permanent.')
    event.currentTarget.reset()
  }
  return (
    <Page title="GUESTBOOK" background={BGGuestbook}><p className="archive-lead">Lämna ett spår i arkivet. Förhandsversionen sparar ännu inte inlägg permanent.</p>
      <form className="guestbook-form" onSubmit={submit}><label>Namn<input name="name" maxLength="60" required /></label><label>Meddelande<textarea name="message" maxLength="800" rows="5" required /></label><button type="submit">Skriv i gästboken</button>{notice && <p className="form-notice" role="status">{notice}</p>}</form>
      <div className="guestbook-entries">{entries.length === 0 ? <p className="archive-note">Inga nya inlägg i den här sessionen ännu.</p> : entries.map((entry, index) => <article key={`${entry.date}-${index}`}><header><strong>{entry.name}</strong><time>{entry.date}</time></header><p>{entry.message}</p></article>)}</div>
    </Page>
  )
}

export const Newsletter = () => (
  <Page title="STREET SCENE" eyebrow="Newsletter · Sverige" background={BGGuestbook}><p className="archive-lead">En framtida redaktionell yta för jams, battles, workshops och människor i Sveriges street scene.</p><div className="archive-grid"><article className="archive-card"><span>Kommande</span><h2>Events & battles</h2><p>Datum, plats, kategorier och länkar till anmälan.</p></article><article className="archive-card"><span>Stories</span><h2>Scenen berättar</h2><p>Intervjuer, crews, historia och nya generationer.</p></article><article className="archive-card"><span>Community</span><h2>Tipsa oss</h2><p>Ett formulär och redaktörsflöde kan kopplas på tillsammans med databasen.</p></article></div><p className="archive-note">Nästa steg: inloggat redaktörsläge, publiceringsstatus och MongoDB-baserat API.</p></Page>
)
