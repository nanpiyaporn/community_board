export default function Card({children, noPadding}) {
  if (!noPadding) {
    classes += "p-4";
  }
    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
