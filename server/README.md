# decorus.world-server

run the server with ```node .```


Action = {
  id: string
  t: timestamp (when state was entered)
}

Effect = {
  id: string
  t: timestamp (when effect was gained)
  v?: number (value for the effect; like 10 Poison or 2 Brave, for whatever need)
} 

Tick = {
    t: timestamp
    e: [
      {
        id: uuid
        a: [Action] (an entity may do multiple actions per Tick)
        x?: number (position)
        y?: number (position)
        <!-- z?: number (position) -->
        d?: number (direction)
        <!-- h?: number (current health) -->
        <!-- p?: [Effect] -->
      },
      ...
    ]
  }
]