import { SITE } from '../../utils/constants'

export default function SectionHeader({ command, id }) {
  return (
    <h2 id={id} className="text-lg mb-8 font-normal text-center">
      <span className="text-accent-green">{SITE.prompt}:~$</span>{' '}
      <span className="text-accent-purple">{command}</span>
    </h2>
  )
}
