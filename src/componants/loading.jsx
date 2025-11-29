export default function LoadingBar(){
    return <>
        <div className="response-parent loading-row" key="loading" aria-live="polite">
            <div className="response-loading">
              <div className="dots" aria-hidden="true">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <div className="loading-text">Assistant is typing…</div>
            </div>
          </div>
    </>
}