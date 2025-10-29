export interface PhotoMate {
  text?: string
  lang?: string
  blurhash?: string
  isLive?: boolean
  liveUrl?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

const metaInfo = Object.entries(
  import.meta.glob<PhotoMate>('./**/*.json', {
    eager: true,
    import: 'default',
  }),
).map(([name, data]) => {
  name = name.replace(/\.\w+$/, '').replace(/^\.\//, '')
  return {
    name,
    data,
  }
})

const imageEntries = Object.entries(
  import.meta.glob<string>('./**/*.{jpg,png,JPG,PNG}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).map(([name, url]) => {
  name = name.replace(/\.\w+$/, '').replace(/^\.\//, '')
  return { name, url }
})

const liveEntries = Object.entries(
  import.meta.glob<string>('./**/*.{mp4,mov,MP4,MOV}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).map(([name, url]) => {
  name = name.replace(/\.\w+$/, '').replace(/^\.\//, '')
  return { name, url }
})

const photos = imageEntries
  .map(({ name, url }): Photo => {
    const meta = metaInfo.find(i => i.name === name)?.data
    const live = liveEntries.find(i => i.name === name)
    return {
      ...meta,
      name,
      url,
      isLive: meta?.isLive || !!live,
      liveUrl: live?.url || meta?.liveUrl,
    }
  })
  .sort((a, b) => b.name.localeCompare(a.name))

export default photos
